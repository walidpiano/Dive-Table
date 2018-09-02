from flask import render_template, request, redirect, url_for, jsonify, abort
from app import app


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html")


@app.route("/ean32")
def go_to_ean32():
    return render_template("ean32.html")


@app.route("/ean36")
def go_to_ean36():
    return render_template("ean36.html")


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html")



