if (window === window.top) {
    /**
     * An adapter for Safari App Extension content scripts
     */
    class SafariExtensionContentScriptAdapter {
      constructor() {
        this.handlers = {};
        this.handlerIds = {};

        safari.self.addEventListener('message', (event) => {
          let message = this.buildMessageWithoutObjectReferenceBug(event.message);

          if ("__modified_payload" in message) {
            message = message["__modified_payload"];
          }
          if (this.handlers[event.name]) {
            this.handlers[event.name].forEach(handler => handler(message));
          }
        });

        this.nativeCall = this.nativeCall.bind(this);
      }

      // See https://joinhoney.atlassian.net/browse/EXT-982
      buildMessageWithoutObjectReferenceBug(src) {
        if (src instanceof Object) {
          const dest = src instanceof Array ? [] : {};

          return Object.keys(src).reduce((dest, key) => {
            dest[key] = this.buildMessageWithoutObjectReferenceBug(src[key]);

            return dest;
          }, dest);
        }

        return src;
      }

      nativeHandle(messageName, handler, handlerId) {
        const handlers = this.handlers[messageName] = this.handlers[messageName] || [];
        const handlerIds = this.handlerIds[messageName] = this.handlerIds[messageName] || [];

        handlers.push(handler);
        handlerIds.push(handlerId);
      }

      nativeCall(message, data, handler) {
        const cbId = `${message.name || 'msg'}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

        this.nativeHandle(cbId, (data) => {
          if (handler) {
            handler(data);
          }

          this.handlers[cbId] = [];
        });

        safari.extension.dispatchMessage(message, { cbId, data });
      }

      nativeRemoveHandler(messageName, handlerId) {
        const handlers = this.handlers[messageName];
        const handlerIds = this.handlerIds[messageName];
        const handlerIndex = handlerIds.indexOf(handlerId);

        if (handlerIndex >= 0) {
          handlers.splice(handlerIndex, 1);
          handlerIds.splice(handlerIndex, 1);
        }
      }
    }

    initializeSafariServices();
    safari.adapter = new SafariExtensionContentScriptAdapter();
}

