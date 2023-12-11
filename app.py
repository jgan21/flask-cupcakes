"""Flask app for Cupcakes"""

import os
from flask import Flask, request, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.get("/api/cupcakes")
def list_all_cupcakes():
    """Return JSON of all cupcakes."""

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get("/api/cupcakes/<cupcake_id>")
def list_single_cupcake(cupcake_id):
    """Return JSON {'cupcake' : {id, flavor, size, rating, image_url}}. """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post("/api/cupcakes")
def create_cupcake():
    """Create cupcake from post JSON and return it

    Returns JSON {'cupcake': {...}}
    """

    ##id flavor size rating image_url

   # id = request.json["id"]
    flavor = request.json["flavor"]
    size = request.json.get("size")
    breakpoint()
    rating = request.json.get("rating")
    image_url = request.json.get("image_url")

    new_cupcake = Cupcake(id=id,flavor=flavor,
                          size=size,rating=rating, image_url=image_url)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake=serialized),201)











