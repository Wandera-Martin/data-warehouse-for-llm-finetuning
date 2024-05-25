import pytest
from pymongo.errors import DuplicateKeyError
from mongomock import MongoClient

import os

os.chdir('../')

# import the MongoDB class from the database.mongodb module
from database.mongodb import MongoDB

# Create a fixture to mock the database
@pytest.fixture
def mock_db():
    client = MongoClient()
    yield client

def test_get_database(mock_db):
    mongodb = MongoDB(collection_name='test_collection', db_name='test_db')
    db = mongodb.get_database()
    # Check if the database is created with the correct name
    assert db.name == mock_db['test_db'].name