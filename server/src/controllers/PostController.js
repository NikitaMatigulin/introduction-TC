const PostService = require("../services/PostService");
const formatResponse = require("../utils/formatResponse");

class PostController {
  static async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      res.json(formatResponse(200, "Посты успешно получены", posts));
    } catch (error) {
      console.error("Error getting posts:", error);
      res
        .status(500)
        .json(
          formatResponse(500, "Внутренняя ошибка сервера", null, error.message)
        );
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res
          .status(400)
          .json(formatResponse(400, "ID должен быть числом", null));
      }

      const post = await PostService.getById(parseInt(id));
      res.json(formatResponse(200, "Пост успешно получен", post));
    } catch (error) {
      console.error("Error getting post:", error);
      if (error.message === "Пост не найден") {
        return res.status(404).json(formatResponse(404, error.message, null));
      }
      res
        .status(500)
        .json(
          formatResponse(500, "Внутренняя ошибка сервера", null, error.message)
        );
    }
  }

  static async create(req, res) {
    try {
      const { title, content, user_id } = req.body;

      if (!title || !content || !user_id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Необходимо указать title, content и user_id",
              null
            )
          );
      }

      if (typeof title !== "string" || typeof content !== "string") {
        return res
          .status(400)
          .json(
            formatResponse(400, "Title и content должны быть строками", null)
          );
      }

      if (isNaN(user_id)) {
        return res
          .status(400)
          .json(formatResponse(400, "user_id должен быть числом", null));
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        user_id: parseInt(user_id),
      };

      const post = await PostService.create(postData);
      res.status(201).json(formatResponse(201, "Пост успешно создан", post));
    } catch (error) {
      console.error("Error creating post:", error);
      res
        .status(500)
        .json(
          formatResponse(500, "Внутренняя ошибка сервера", null, error.message)
        );
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, user_id } = req.body;

      if (!id || isNaN(id)) {
        return res
          .status(400)
          .json(formatResponse(400, "ID должен быть числом", null));
      }

      if (!title || !content || !user_id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Необходимо указать title, content и user_id",
              null
            )
          );
      }

      if (typeof title !== "string" || typeof content !== "string") {
        return res
          .status(400)
          .json(
            formatResponse(400, "Title и content должны быть строками", null)
          );
      }

      if (isNaN(user_id)) {
        return res
          .status(400)
          .json(formatResponse(400, "user_id должен быть числом", null));
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        user_id: parseInt(user_id),
      };

      const post = await PostService.update(parseInt(id), postData);
      res.json(formatResponse(200, "Пост успешно обновлен", post));
    } catch (error) {
      console.error("Error updating post:", error);
      if (error.message === "Пост не найден") {
        return res.status(404).json(formatResponse(404, error.message, null));
      }
      res
        .status(500)
        .json(
          formatResponse(500, "Внутренняя ошибка сервера", null, error.message)
        );
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res
          .status(400)
          .json(formatResponse(400, "ID должен быть числом", null));
      }

      const post = await PostService.delete(parseInt(id));
      res.json(formatResponse(200, "Пост успешно удален", post));
    } catch (error) {
      console.error("Error deleting post:", error);
      if (error.message === "Пост не найден") {
        return res.status(404).json(formatResponse(404, error.message, null));
      }
      res
        .status(500)
        .json(
          formatResponse(500, "Внутренняя ошибка сервера", null, error.message)
        );
    }
  }
}

module.exports = PostController;
