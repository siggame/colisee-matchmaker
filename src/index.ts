import { app, default as matchmaker } from "./app";

// equivalent of python's __name__ == "__main__"

if (!module.parent) {
    matchmaker();
}

export { app };
