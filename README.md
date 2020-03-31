# cityjson_ogcapi


## demo online

[-->demo](http://hugoledoux.pythonanywhere.com/)

## to run locally

__Watch out, cjio must use the 'develop' branch otherwise nothing will work__

```bash
$ env FLASK_APP=app.py flask run
```

In debug mode:
```bash
$ env FLASK_APP=app.py FLASK_ENV=development flask run
```

## example of WFS3 URL

```
http://localhost:5000/collections/delft/items/?limit=5&offset=10
```

```
http://localhost:5000/collections/delft/items/?f=json
```

```
http://localhost:5000/collections/delft/items/?bbox=1.2,44.9,55.0,1909.1
```