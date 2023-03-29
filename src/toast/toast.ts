import "./toast.css";

interface ToastOptions {
  type: string;
  message: string;
  buttons: {
    text: string;
    onClick: () => Promise<null>;
  }[];
}

export const createToastManager = () => {
  const open = (slideContainer: HTMLDivElement, options: ToastOptions) => {
    slideContainer.innerHTML = "";
    slideContainer.setAttribute("aria-hidden", "false");

    const toastEl = document.createElement("div");
    toastEl.classList.add("toastjs");
    toastEl.classList.add(options.type);

    const message = document.createElement("p");
    message.innerText = options.message;
    toastEl.appendChild(message);

    const loading = document.createElement("span");

    const setLoadingState = (isLoading: boolean, content: string) => {
      toastEl
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = isLoading));
      loading.innerText = content;
    };

    options.buttons.forEach(({ text, onClick }) => {
      const button = document.createElement("button");
      button.classList.add("toastjs-btn");
      button.classList.add("toastjs-btn--custom");
      button.innerText = text;
      button.onclick = () => {
        setLoadingState(true, "Loading...");
        onClick()
          .then(() => {
            setLoadingState(false, "");
            close(slideContainer);
          })
          .catch((err) => {
            setLoadingState(false, err);
          });
      };
      toastEl.appendChild(button);
    });

    toastEl.appendChild(loading);

    slideContainer.appendChild(toastEl);
  };

  const close = (slideContainer: HTMLDivElement) => {
    slideContainer.setAttribute("aria-hidden", "true");
  };

  // created ahead of time for the transitions to work
  const container = document.createElement("div");
  container.classList.add("toastjs-container");
  container.setAttribute("role", "alert");
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  return (options: ToastOptions) => {
    open(container, options);
  };
};
