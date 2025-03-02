const PostService = require("../services/PostService");
const PostValidator = require("../utils/PostValidator");
const formatResponse = require("../utils/formatResponse");
const isValidId = require("../utils/isValidId");
const reformatId = require("../utils/reformatId");

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

      if (!id || !isValidId(id)) {
        return res
          .status(400)
          .json(formatResponse(400, "ID должен быть числом", null));
      }

      const post = await PostService.getById(reformatId(id));
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

      const { isValid, error } = PostValidator.validateCreate({
        title,
        content,
        user_id,
      });

      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Ошибка валидации", null, error));
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        user_id: reformatId(user_id),
      };

      const post = await PostService.create(postData);
      res.status(201).json(formatResponse(201, "Пост успешно создан", post));
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.message === "Пользователь не найден") {
        return res.status(404).json(formatResponse(404, error.message, null));
      }
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

      const { isValid, error } = PostValidator.validateUpdate({
        id,
        title,
        content,
        user_id,
      });

      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Ошибка валидации", null, error));
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        user_id: reformatId(user_id),
      };

      const post = await PostService.update(reformatId(id), postData);
      res.json(formatResponse(200, "Пост успешно обновлен", post));
    } catch (error) {
      console.error("Error updating post:", error);
      if (
        error.message === "Пост не найден" ||
        error.message === "Пользователь не найден"
      ) {
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

      if (!id || !isValidId(id)) {
        return res
          .status(400)
          .json(formatResponse(400, "ID поста должен быть числом", null));
      }

      const post = await PostService.delete(reformatId(id));
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
