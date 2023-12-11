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
    """Return all cupcakes.

    Returns JSON:
    {'cupcakes' : [{id, flavor, size, rating, image_url}, ...]}
    """

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get("/api/cupcakes/<int:cupcake_id>")
def list_single_cupcake(cupcake_id):
    """Return a specific cupcake.

    Returns JSON : {'cupcake' : {id, flavor, size, rating, image_url}}.
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post("/api/cupcakes")
def create_cupcake():
    """Create cupcake from post JSON and return it

    Returns JSON : {'cupcake': {...}}
    """

    ##id flavor size rating image_url

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image_url = request.json["image_url"] or None

    new_cupcake = Cupcake(
        flavor=flavor,
        size=size,
        rating=rating,
        image_url=image_url
    )

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake=serialized),201)

@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_single_cupcake(cupcake_id):
    """ Updates any of (flavor,size,rating,image_url) in cupcake.

        Returns JSON on updated cupcake {cupcake : {...}}
    """
    cupcake = Cupcake.query.get_or_404(cupcake_id)


    cupcake.flavor = request.json.get('flavor')
    cupcake.size = request.json.get('size')
    cupcake.rating = request.json.get('rating')
    cupcake.image_url = request.json.get('image_url')


    #FIXME: ask about the garbage below
    # for key in fields_to_update:
    #     cupcake[key] = fields_to_update[key]

    db.session.commit()
    serialized = cupcake.serialize()

    return (jsonify(cupcake=serialized), 200)

    # can .get json fields to avoid errors or...
    # is there a way to get all fields from .json??


@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_single_cupcake(cupcake_id):
    """ Deletes a cupcake.

    Returns JSON: {deleted: [cupcake_id]}
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return (jsonify(deleted=cupcake_id), 200)






