
# Import Dependencies 
from flask import Flask, render_template, redirect 
from flask_pymongo import PyMongo
import scrape_mars
import os


app = Flask(__name__)


conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)


@app.route("/")
def home(): 

    # Find data
    mars_info = mongo.db.mars_info.find_one()

    # Return template and data
    return render_template("index.html", mars_info=mars_info)

# Route that will trigger scrape function
@app.route("/scrape")
def scrape(): 

    # Run scrapped functions
    mars_info = mongo.db.mars_info
    mars_data = scrape_mars.scrape_news()
    mars_data = scrape_mars.scrape_image()
    mars_f = scrape_mars.scrape_facts()
    mars_w = scrape_mars.scrape_weather()
    mars_data = scrape_mars.scrape_hemisphere()
    mars_info.update({}, mars_data, upsert=True)

    return redirect("/", code=302)

if __name__ == "__main__": 
    app.run(debug= True)

#from flask import Flask, render_template, redirect
#from flask_pymongo import PyMongo
#import scrape_mars
#import sys
#import os
#sys.setrecursionlimit(2000)
#app = Flask(__name__)

#mongo = PyMongo(app, uri="mongodb://localhost:27017/weather_app")

# setup mongo connection
#conn = "mongodb://localhost:27017"
#client = pymongo.MongoClient(conn)
#db = client.mars_db
#collection = db.mars_facts

#@app.route('/scrape')
#def scrape():
   # db.collection.remove()
 #   mars = scrape_mars.scrape()
  #  print("\n\n\n")
   # db.mars_facts.insert_one(mars)
   # return "Some scrapped data"

#@app.route("/")
#def home():
 #   mars = list(db.mars_facts.find())
  #  print(mars)
   # return render_template("index.html", mars = mars)

#if __name__ == "__main__":
 #   app.run(debug=True)


#db = client.mars_db
#collection = db.mars_facts

#@app.route('/scrape')
#def scrape():
 #   mars = scrape_mars.scrape()
  #  print("\n\n\n")
   # db.mars_facts.insert_one(mars)
    #return "Some scrapped data"
#@app.route("/")
#def home(): 
 #   mars_info = mongo.db.mars_info.find_one()
  #  return render_template("index.html", mars_info=mars_info)
#@app.route("/scrape")
#def scrape(): 

    # Run scrapped functions
 #   mars_info = mongo.db.mars_info
  #  mars_data = scrape_mars.scrape_news()
   # mars_data = scrape_mars.scrape_image()
    #mars_f = scrape_mars.scrape_facts()
    #mars_w = scrape_mars.scrape_weather()
    #mars_data = scrape_mars.scrape_hemisphere()
    #mars_info.update({}, mars_data, upsert=True)

    #return redirect("/", code=302)

#if __name__ == "__main__": 
 #   app.run(debug= True)