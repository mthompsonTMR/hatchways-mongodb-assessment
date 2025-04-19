// ====================
// MongoDB Assessment - assessment.js (with labeled output)
// ====================

use sample_mflix;

print("\n=== Task 1: Insert a new user ===");
db.users.insertOne({
  name: "Mike Thompson",
  email: "mike@example.com"
});

print("\n=== Task 2: Find all movies directed by Christopher Nolan ===");
db.movies.find({ director: "Christopher Nolan" });

print("\n=== Task 3: Find Action movies sorted by year (descending) ===");
db.movies.find({ genres: "Action" }).sort({ year: -1 });

print("\n=== Task 4: Movies with IMDb rating > 8, return title + IMDb only ===");
db.movies.find(
  { "imdb.rating": { $gt: 8 } },
  { title: 1, "imdb.rating": 1, _id: 0 }
);

print("\n=== Task 5: Movies starring both 'Tom Hanks' and 'Tim Allen' ===");
db.movies.find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } });

print("\n=== Task 6: Movies starring only 'Tom Hanks' and 'Tim Allen' ===");
db.movies.find({ cast: { $size: 2, $all: ["Tom Hanks", "Tim Allen"] } });

print("\n=== Task 7: Comedy movies directed by Steven Spielberg ===");
db.movies.find({ genres: "Comedy", director: "Steven Spielberg" });

print("\n=== Task 8: Add 'available_on' = 'Sflix' to 'The Matrix' ===");
db.movies.updateOne(
  { title: "The Matrix" },
  { $set: { available_on: "Sflix" } }
);

print("\n=== Task 9: Increment 'The Matrix' metacritic by 1 ===");
db.movies.updateOne(
  { title: "The Matrix" },
  { $inc: { "metacritic": 1 } }
);

print("\n=== Task 10: Add genre 'Gen Z' to 1997 movies ===");
db.movies.updateMany(
  { year: 1997 },
  { $addToSet: { genres: "Gen Z" } }
);

print("\n=== Task 11: Increase IMDb by 1 where rating < 5 ===");
db.movies.updateMany(
  { "imdb.rating": { $lt: 5 } },
  { $inc: { "imdb.rating": 1 } }
);

print("\n=== Task 12: Delete a comment by _id (replace ID manually) ===");
// db.comments.deleteOne({ _id: ObjectId("PUT_ID_HERE") });

print("\n=== Task 13: Delete all comments for 'The Matrix' ===");
db.comments.deleteMany({ movie_id: db.movies.findOne({ title: "The Matrix" })._id });

print("\n=== Task 14: Delete movies with no genres ===");
db.movies.deleteMany({ genres: { $exists: true, $size: 0 } });

print("\n=== Task 15: Count movies by year (ascending) ===");
db.movies.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

print("\n=== Task 16: Avg IMDb rating by director, sorted high to low ===");
db.movies.aggregate([
  { $match: { "imdb.rating": { $exists: true } } },
  { $group: { _id: "$director", avgRating: { $avg: "$imdb.rating" } } },
  { $sort: { avgRating: -1 } }
]);