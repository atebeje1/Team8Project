import requests
from bs4 import BeautifulSoup

type = input('What gas type do you need? Enter Regular, Mid-grade, Premium, or Diesel: ')

suffix = ''
if type == 'Regular':
  suffix = ''
elif type == 'Mid-grade':
  suffix = 'premium/'
elif type == 'Premium':
  suffix = 'mid-grade/'
elif type == 'Diesel':
  suffix = 'diesel/'

location = input('Enter City, State, or Zip: ')

url = 'https://www.autoblog.com/{}-gas-prices/{}'.format(
  location, suffix)

print('Searching for {} gas prices in {} . . .'.format(type.casefold(), location))
request = requests.get(url)
content = request.content

soup = BeautifulSoup(content, features='html5lib')

data = soup.find('ol')

data = data.find_all('li')

for entry in data:
  specificdata = entry.find('ul')

  print(specificdata)
