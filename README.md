# ⚛️ Counter App (Minor Project - InternsElite)

## 📌 Project Title & Objective
**Counter App** — A simple yet feature-rich counter application built with **React** as part of the *Minor Project* in the **InternsElite MERN Stack Program (July 2025 Batch)**.  
The app demonstrates **state management**, **event handling**, and **conditional rendering** in React, along with bonus features for improved UX.

---

## 📄 Brief Description
This application allows the user to:
- Increment, decrement, and reset a counter.
- Define custom **upper** and **lower bounds** for the counter.
- Set a **custom step size** for increment/decrement.
- Toggle **negative value allowance**.
- Enjoy a dynamic, responsive UI with persistent state saved in `localStorage`.

The project reinforces React fundamentals through practical implementation while also showcasing optional enhancements like animations and dynamic styling.

---

## 📊 Sample Input & Output

1. **Increment Button Clicked**  
   When the increment button is clicked, the counter value increases by the current step size. This continues until the upper bound is reached, at which point the increment button is disabled.

2. **Step Size Changed**  
   When the step size is changed by the user, all subsequent increments and decrements are performed using this new step size. This allows flexible control over how fast the counter changes.

3. **Upper/Lower Bound Reached**  
   When the counter reaches the upper bound, it cannot be incremented further. Similarly, when the counter reaches the lower bound, it cannot be decremented further. Buttons are automatically disabled to prevent crossing the set limits.

---

## 🔗 GitHub Repository Link
[Minor-Project-InternsElite](https://github.com/gautamb817/Minor-Project-InternsElite)

---

## 🌐 Live Demo Link
[Live Demo](https://minor-project-interns-elite.vercel.app/)

---

## 🛠 Technologies Used
- **React 18**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **localStorage API**

---

## ⚙ How to Run the App Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/gautamb817/Minor-Project-InternsElite.git
   cd Minor-Project-InternsElite
