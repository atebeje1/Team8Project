if (window.top === window && window.location.href !== 'about:blank') {
    function getSelectedTab() {
      return new Promise((resolve) => {
        safari.windows.query({ active: true }, ([activeWindow]) => {
          if (activeWindow) {
            safari.tabs.query({ active: true, windowId: activeWindow.id }, ([activeTab]) => resolve(activeTab));
          } else {
            resolve(null);
          }
        });
      });
    }

    async function getCurrentStore(activeTab) {
        let url = window.location.href;
        const isShopify = !!(document.querySelector('[name="shopify-checkout-api-token"]') || document.querySelector('[name="shopify-checkout-authorization-token"]')); // eslint-disable-line max-len
        const isShopifyPay = window.location.hostname === 'shop.app';
        if (isShopifyPay) {
          url = JSON.parse(document.querySelector('meta[name="store"]').content).url;
        }

        const message = {
          type: 'page:detect_store',
          service: 'messages:cs',
          dest: { background: true },
          tabId: activeTab.id,
          url: window.location.href,
          src: { type: 'tab', tabId: activeTab.id },
          content: JSON.stringify({
            url,
            isShopify,
            isShopifyPay,
          }),
        };

        return new Promise(resolve => {
            safari.runtime.sendMessage({ name: 'page:detect_store', message }, resolve);
        });
    }

    window.checkStore = async function checkStoreSafari(callback) {
        // Needed for install detection before BG script is fully started
        const isHoneyDomain = window.location.hostname.endsWith('joinhoney.com');
        if (isHoneyDomain) {
            callback({ id: '7603752151579449294' });
            return;
        }

        // Safari doesn't refresh badge on page load so refresh badge first
        const message = {
          type: 'setButtonInfo',
          info: { badgeText: '' },
        };
        safari.runtime.sendMessage({ name: 'button:cs', message });

        const activeTab = await getSelectedTab();

        const { data: store } = await getCurrentStore(activeTab);

        callback(store);
    };
}

