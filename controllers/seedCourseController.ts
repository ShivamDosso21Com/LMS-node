
import sequelize from '../config/database';

import { CourseTable } from "../models/courseModel";



const seedCourses = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Courses table created.'); 
    
  

    const courses = [
      { name: 'Course 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Course 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Course 3', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Course 4', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Course 5', createdAt: new Date(), updatedAt: new Date() },
    ];

    for (const course of courses) {
      await CourseTable.create(course);
    }

    console.log('Courses seeded successfully.');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    await sequelize.close();
  }
};

seedCourses();










/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  const m = s.length;
  const n = p.length;

  // dp[i][j] will be true if s[0:i] matches p[0:j]
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(false));
  dp[0][0] = true; // Both s and p are empty

  // Fill dp for the case when s is empty
  for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
          dp[0][j] = dp[0][j - 2];
      }
  }

  // Fill the rest of the dp table
  for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
          if (p[j - 1] === '*') {
              dp[i][j] = dp[i][j - 2] || ((s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[i - 1][j]);
          } else {
              dp[i][j] = (s[i - 1] === p[j - 1] || p[j - 1] === '.') && dp[i - 1][j - 1];
          }
      }
  }

  return dp[m][n];
}

// Example usage:
console.log(isMatch("aa", "a")); // false
console.log(isMatch("aa", "a*")); // true
console.log(isMatch("ab", ".*")); // true
