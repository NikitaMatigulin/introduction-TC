class PostValidator {
  static validateCreate({ title, content, user_id }) {
    if (!title || title.trim().length === 0 || typeof title !== "string") {
      return {
        isValid: false,
        error: "Заголовок поста обязателен и должен быть непустой строкой",
      };
    }

    if (title.trim().length < 3) {
      return {
        isValid: false,
        error: "Заголовок должен содержать минимум 3 символа",
      };
    }

    if (
      !content ||
      content.trim().length === 0 ||
      typeof content !== "string"
    ) {
      return {
        isValid: false,
        error: "Содержание поста обязательно и должно быть непустой строкой",
      };
    }

    if (content.trim().length < 10) {
      return {
        isValid: false,
        error: "Содержание должно содержать минимум 10 символов",
      };
    }

    if (!user_id) {
      return {
        isValid: false,
        error: "ID пользователя обязателен",
      };
    }

    if (!this.validateId(user_id)) {
      return {
        isValid: false,
        error: "ID пользователя должен быть положительным числом",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateUpdate({ id, title, content, user_id }) {
    if (!id || !this.validateId(id)) {
      return {
        isValid: false,
        error: "ID поста должен быть положительным числом",
      };
    }

    return this.validateCreate({ title, content, user_id });
  }

  static validateId(id) {
    return !isNaN(id) && Number(id) > 0;
  }
}

module.exports = PostValidator;
