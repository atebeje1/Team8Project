import requests
from bs4 import BeautifulSoup

url = 'https://www.autoblog.com/{}-gas-prices/'.format(
  input('Enter City, State, or Zip: '))

request = requests.get(url)
content = request.content

soup = BeautifulSoup(content, features='html5lib')

data = soup.find('ol')

data = data.find_all('li')

for entry in data:
  specificdata = entry.find('ul')
  print(specificdata)
