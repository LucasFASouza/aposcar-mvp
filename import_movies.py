import pandas as pd
import requests
import math

url_base = "http://127.0.0.1:8000/"

df_movies = pd.read_excel('Aposcar.xlsx', sheet_name='movies')
url_movies = f"{url_base}api/movies"

for ind in df_movies.index:
    data = {
        'movie': {
            'title': df_movies['title'][ind],
            'description': df_movies['description'][ind],
            'poster_url': df_movies['poster_url'][ind]
        }
    }

    post_response = requests.post(url_movies, json=data)

    post_response_json = post_response.json()
    print(post_response_json)

df_categories = pd.read_excel('Aposcar.xlsx', sheet_name='categories')
url_categories = f"{url_base}api/categories"

for ind in df_categories.index:
    data = {
        'category': {
            'name': df_categories['name'][ind],
            'type': df_categories['type'][ind]
        }
    }

    post_response = requests.post(url_categories, json=data)

    post_response_json = post_response.json()
    print(post_response_json)

url_movies = f"{url_base}api/movies"
response = requests.get(url_movies)
response_json = response.json()
df_movies = pd.DataFrame(response_json['movies'])

url_categories = f"{url_base}api/categories"
response = requests.get(url_categories)
response_json = response.json()
df_categories = pd.DataFrame(response_json['categories'])

df_receivers = pd.read_excel('Aposcar.xlsx', sheet_name='receivers')
url_receivers = f"{url_base}api/receivers"

for ind in df_receivers.index:
    if not isinstance(df_receivers['description'][ind], str) and math.isnan(df_receivers['description'][ind]):
        desc = ''
    else:
        desc = df_receivers['description'][ind]

    if not isinstance(df_receivers['photo_url'][ind], str) and math.isnan(df_receivers['photo_url'][ind]):
        photo = ''
    else:
        photo = df_receivers['photo_url'][ind]

    movie = df_movies[df_movies['title'] == df_receivers['movie'][ind]]['id'].iloc[0]
    category = df_categories[df_categories['name'] == df_receivers['category'][ind]]['id'].iloc[0]

    data = {
        'receiver': {
            'name': df_receivers['name'][ind],
            'description': desc,
            'photo_url': photo,
            'movie': int(movie),
            'category': int(category)
        }
    }

    post_response = requests.post(url_receivers, json=data)

    post_response_json = post_response.json()
    print(post_response_json)
