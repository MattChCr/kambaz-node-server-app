import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users.push(newUser);
    return newUser;
  };

  const findAllUsers = () => db.users;

  const findUserById = (userId) => db.users.find((user) => user._id === userId);

  const findUserByUsername = (username) => db.users.find((user) => user.username === username);

  const findUserByCredentials = (username, password) =>
    db.users.find((user) => user.username === username && user.password === password);

  const updateUser = (userId, userUpdates) => {
    const index = db.users.findIndex((u) => u._id === userId);
    if (index !== -1) {
      db.users[index] = { ...db.users[index], ...userUpdates, _id: userId };
    }
  };

  const deleteUser = (userId) => {
    const index = db.users.findIndex((u) => u._id === userId);
    if (index !== -1) {
      db.users.splice(index, 1);
    }
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
