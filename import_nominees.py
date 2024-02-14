import pandas as pd
import requests
import math

url_base = "http://127.0.0.1:8000/"

df_nominees = pd.read_excel('Aposcar.xlsx', sheet_name='categories')

url_movies = f"{url_base}api/movies"
response = requests.get(url_movies)
response_json = response.json()
df_movies = pd.DataFrame(response_json['movies'])

url_categories = f"{url_base}api/categories"
response = requests.get(url_categories)
response_json = response.json()
df_categories = pd.DataFrame(response_json['categories'])

for ind in df_nominees.index:
    category = df_categories[df_categories['name'] == df_nominees['name'][ind]]
    category_id = int(category['id'].iloc[0])

    movies_ids = []
    movie_1 = df_movies[df_movies['title'] == df_nominees['nominee 1'][ind]]
    movie_2 = df_movies[df_movies['title'] == df_nominees['nominee 2'][ind]]
    movie_3 = df_movies[df_movies['title'] == df_nominees['nominee 3'][ind]]
    movie_4 = df_movies[df_movies['title'] == df_nominees['nominee 4'][ind]]
    movie_5 = df_movies[df_movies['title'] == df_nominees['nominee 5'][ind]]

    movies_ids.append(int(movie_1['id'].iloc[0]))
    movies_ids.append(int(movie_2['id'].iloc[0]))
    movies_ids.append(int(movie_3['id'].iloc[0]))
    movies_ids.append(int(movie_4['id'].iloc[0]))
    movies_ids.append(int(movie_5['id'].iloc[0]))

    data = {
        "category": {
            'name': df_categories['name'][ind],
            'type': df_categories['type'][ind],
            'nominees': movies_ids
        }
    }

    url_categories = f"{url_base}api/categories/{category_id}"
    put_response = requests.put(url_categories, json=data)

    put_response_json = put_response.json()
    print(put_response_json)