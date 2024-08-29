// Функция получения элемента ошибки

function getErrorElement(formElement, inputElement, settings) {
  return formElement.querySelector(`.${inputElement.id}-error`);
}

// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = getErrorElement(formElement, inputElement, settings);
  if (errorElement) {
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = getErrorElement(formElement, inputElement, settings);
  if (errorElement) {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }
};

// Функция проверки валидности поля
const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      showInputError(
        formElement,
        inputElement,
        inputElement.dataset.errorMessage,
        settings
      );
    } else if (
      inputElement.validity.tooShort ||
      inputElement.validity.tooLong
    ) {
      showInputError(
        formElement,
        inputElement,
        `Поле должно содержать от ${inputElement.minLength} до ${inputElement.maxLength} символов.`,
        settings
      );
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    }
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};
// Функция проверки валидности всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.value.trim() === "";
  });
};

// Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Функция установки слушателей на поля формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// Функция включения валидации формы
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

// Функция для очистки формы и сброса состояния кнопки
export function resetForm(formElement, settings) {
  formElement.reset();
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
}
