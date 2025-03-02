const { Post, User } = require("../db/models");

class PostService {
  static async getAll() {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return posts;
  }

  static async getById(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!post) {
      throw new Error("Пост не найден");
    }
    return post;
  }

  static async create(data) {
    console.log("Creating post with data:", data);
    const user = await User.findByPk(data.user_id);
    console.log("Found user:", user ? "yes" : "no");

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const post = await Post.create(data);
    const postWithUser = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return postWithUser;
  }

  static async update(id, data) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("Пост не найден");
    }

    if (data.user_id) {
      const user = await User.findByPk(data.user_id);
      if (!user) {
        throw new Error("Пользователь не найден");
      }
    }

    await post.update(data);
    const updatedPost = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return updatedPost;
  }

  static async delete(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!post) {
      throw new Error("Пост не найден");
    }
    await post.destroy();
    return post;
  }
}

module.exports = PostService;
