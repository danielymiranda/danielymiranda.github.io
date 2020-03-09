
#Declare Dependencies
from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd
import os
import time
import requests
import warnings
warnings.filterwarnings('ignore')


def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)



# Sacar noticias de la NASA
def scrape_news():
    mars_info={}
    output=marsNews()
    browser= init_browser()
    url='https://mars.nasa.gov/news/'
    browser.visit(url)

    html=browser.html
    
    soup=bs(html, 'html.parser')
    news_title = soup.find('div', class_='content_title').find('a').text
    news_paragraph = soup.find('div', class_='article_teaser_body').text
    mars_info['news_title'] = news_title
    mars_info['news_paragraph'] = news_paragraph

    return mars_info


#Sacar las imagenes
def scrape_image():
    browser= init_browser()
    image_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(image_url)
    html_image=browser.html

    soup=bs(html_image, 'html.parser')
    image_url  = soup.find('article')['style'].replace('background-image: url(','').replace(');', '')[1:-1]
    main_url = 'https://www.jpl.nasa.gov'
    image_url = main_url + image_url
    image_url
    mars_info['image_url'] = image_url 
        
    browser.quit()

    return mars_info

#Sacar el clima de Marte
def scrape_weather():
    browser= init_browser()
    weather_url = 'https://twitter.com/marswxreport?lang=en'
    #browser.visit(weather_url)

    #html_weather=browser.html
    #soup = bs(html_weather, 'html.parser')

    #latest_tweets = soup.find_all('div', class_='js-tweet-text-container')

    #for tweet in latest_tweets: 
     #       mars_weather = tweet.find('p').text
      #      if 'Sol' and 'pressure' in mars_weather:
                #print(mars_weather)
       #         break
        #    else: 
          #      pass
    #mars_info['mars_weather'] = mars_weather

    twitter_response = req.get(weather_url)
    twitter_soup = bs(twitter_response.text, 'html.parser')
    mars_weather = twitter_soup.find_all('div', class_="js-tweet-text-container")
    print(mars_weather[0].text)
    p = mars_weather[0].text
    type(p)
    
    mars_info['mars_weather']=mars_weather

    browser.quit()

    return mars_info

#Mars Facts
def scrape_facts():
    browser=init_browser()
    url = 'http://space-facts.com/mars/'
    browser.visit(url)

    tables = pd.read_html(url)
    df = tables[1]
    df.columns = ['Description', 'Value']
    html_table = df.to_html(table_id="html_tbl_css",justify='left',index=False)

    mars_info['tables'] = html_table
    browser.quit()
    return mars_info

#Mars Hemisphere
def scrape_hemisphere():
    browser=init_browser()
    hemi_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hemi_url)

    html_hemi=browser.html
    soup = bs(html_hemi, 'html.parser')
    items = soup.find_all('div', class_='item')

    hemi=[]
    hemispheres_url = 'https://astrogeology.usgs.gov' 

    for i in items: 
            # Store title
            title = i.find('h3').text
            part_img_url = i.find('a', class_='itemLink product-item')['href']
            browser.visit(hemispheres_url + part_img_url)
            partial_img_html = browser.html
            soup = bs( partial_img_html, 'html.parser')
            img_url = hemispheres_url + soup.find('img', class_='wide-image')['src']
            hemi.append({"title" : title, "img_url" : img_url})
    mars_info['hemi'] = hemi

    browser.quit()
    return mars_info