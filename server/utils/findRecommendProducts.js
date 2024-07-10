function recommendItemsForUser(data, userId, numItems) {
  const matrix = {};

  // Tạo ma trận từ dữ liệu
  data.forEach((record) => {
    const { userId, itemId, rating } = record;

    if (!matrix[userId]) {
      matrix[userId] = {};
    }
    matrix[userId][itemId] = rating;
  });

  // Hàm tính độ tương đồng cosine
  function cosineSimilarity(userA, userB) {
    const commonItems = Object.keys(userA).filter((item) => item in userB);
    if (commonItems.length === 0) {
      return 0;
    }

    const dotProduct = commonItems.reduce(
      (acc, item) => acc + userA[item] * userB[item],
      0
    );
    const magnitudeA = Math.sqrt(
      commonItems.reduce((acc, item) => acc + userA[item] ** 2, 0)
    );
    const magnitudeB = Math.sqrt(
      commonItems.reduce((acc, item) => acc + userB[item] ** 2, 0)
    );

    return dotProduct / (magnitudeA * magnitudeB);
  }

  const targetUser = matrix[userId];
  if (!targetUser) {
    return [];
  }

  const similarities = [];

  for (const otherUser in matrix) {
    if (otherUser !== userId) {
      const similarity = cosineSimilarity(targetUser, matrix[otherUser]);
      similarities.push({ userId: otherUser, similarity });
    }
  }

  similarities.sort((a, b) => b.similarity - a.similarity);

  const recommendedItems = [];
  const seenItems = new Set(Object.keys(targetUser));

  for (const { userId: otherUser } of similarities) {
    const otherUserItems = matrix[otherUser];

    for (const item in otherUserItems) {
      if (!seenItems.has(item)) {
        recommendedItems.push(item);
        seenItems.add(item);

        if (recommendedItems.length === numItems) {
          return recommendedItems;
        }
      }
    }
  }

  return recommendedItems;
}

const data = [
  {
      "userId": "6638987e42ecc4c05f785427",
      "itemId": "6638981a42ecc4c05f7853a8",
      "rating": 4
  },
  {
      "userId": "6641bc3b0e321e74a1769700",
      "itemId": "6638981a42ecc4c05f7853a8",
      "rating": 5
  },
  {
      "userId": "6638987e42ecc4c05f785427",
      "itemId": "6638981a42ecc4c05f7853a9",
      "rating": 5
  },
  {
      "userId": "6641bc3b0e321e74a1769700",
      "itemId": "6638981a42ecc4c05f7853a9",
      "rating": 4
  },
  {
      "userId": "6641bc3b0e321e74a1769700",
      "itemId": "6638981a42ecc4c05f7853ac",
      "rating": 4
  },
  {
      "userId": "6638987e42ecc4c05f785427",
      "itemId": "6638981a42ecc4c05f7853ae",
      "rating": 2
  }
];

const userId = '6638987e42ecc4c05f785427';
const numItems = 3;
const recommendedItems = recommendItemsForUser(data, userId, numItems);
console.log(`Recommended items for user '${userId}':`, recommendedItems);

module.exports = recommendItemsForUser