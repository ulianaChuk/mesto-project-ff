export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

  function getErrorElement(formElement,inputElement){ 
    return formElement.querySelector(`.${inputElement.id}-error`);
  }

// Функция показа ошибки
  const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(formElement,inputElement)
  if (errorElement) {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
};

// Функция скрытия ошибки
 const hideInputError = (formElement, inputElement) => {
  const errorElement = getErrorElement(formElement,inputElement);
  if (errorElement) {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
  }
};
// Функция проверки валидности поля
 const isValid = (formElement, inputElement) => {
  if (inputElement.value.trim() === "") {
    showInputError(formElement, inputElement, "Вы пропустили это поле");
  } else if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      showInputError(
        formElement,
        inputElement,
        inputElement.dataset.errorMessage || "Введите данные в правильном формате"
      );
    } else if (
      inputElement.validity.tooShort ||
      inputElement.validity.tooLong
    ) {
      showInputError(
        formElement,
        inputElement,
        `Поле должно содержать от ${inputElement.minLength} до ${inputElement.maxLength} символов.`
      );
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    }
  } else {
    hideInputError(formElement, inputElement);
  }
};
// Функция проверки валидности всех полей формы
 const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.value.trim() === "";
  });
};
// Функция переключения состояния кнопки
 const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
};
// Функция установки слушателей на поля формы
 const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement,settings);
    });
  });
};
// Функция включения валидации формы
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement,settings);
  });
};

// enableValidation(validationSettings);

// Функция для очистки формы и сброса состояния кнопки
export function resetForm(formElement,settings) {
  formElement.reset();
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
}
