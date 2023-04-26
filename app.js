import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js"

const submitBtn = document.querySelector(".form > .btn-submit")
const formInput = document.querySelector(".form > input")

let groceriesList = []
let editFlag = false
let editId = ""

window.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("groceries")) {
        return
    }
    if (localStorage.getItem("groceries")) {
        groceriesList = JSON.parse(localStorage.getItem("groceries"))

        populateItems(groceriesList)
    }

    console.log(groceriesList)
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (formInput.value == "") {
        emptyAlert()

        formInput.focus()
        return
    }

    if (formInput.value && editFlag == false) {
        const newObj = {
            id: nanoid(),
            value: formInput.value,
        }

        groceriesList.push(newObj)
        localStorage.setItem("groceries", JSON.stringify(groceriesList))
        populateItems(groceriesList)

        formInput.value = ""

        formInput.focus()
    }

    if (formInput.value && editFlag == true) {
        groceriesList = groceriesList.map((item) => {
            if (item.id == editId) {
                return { ...item, value: formInput.value }
            } else {
                return item
            }
        })

        localStorage.setItem("groceries", JSON.stringify(groceriesList))
        populateItems(groceriesList)

        editFlag = false
        formInput.value = ""
        submitBtn.textContent = "Submit"

        formInput.focus()
    }
})

const emptyAlert = () => {
    console.log("empty alert")
}

const populateItems = (itemList) => {
    const itemElements = itemList
        .map((item) => {
            return `
            <article class="item" data-id=${item.id}>
                        <h3 class="item-name">${item.value}</h3>
                        <div class="btn-container">
                            <div class="btn btn-edit">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="btn btn-delete">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </article>
            `
        })
        .join("")

    document.querySelector(".content").innerHTML = itemElements

    document.querySelectorAll(".btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("btn-delete")) {
                groceriesList = groceriesList.filter(
                    (item) =>
                        item.id !== btn.parentElement.parentElement.dataset.id
                )

                localStorage.setItem("groceries", JSON.stringify(groceriesList))
                populateItems(groceriesList)

                editFlag = false
                formInput.value = ""
                submitBtn.textContent = "Submit"

                formInput.focus()
            }

            if (e.currentTarget.classList.contains("btn-edit")) {
                editFlag = true

                formInput.value =
                    btn.parentElement.parentElement.children[0].textContent
                editId = btn.parentElement.parentElement.dataset.id
                submitBtn.textContent = "Edit"

                formInput.focus()
            }
        })
    )

    if (groceriesList.length > 0) {
        document.querySelector(".btn-container-clear").classList.add("show")
    }
    if (groceriesList.length == 0) {
        document.querySelector(".btn-container-clear").classList.remove("show")
    }

    document.querySelector(".btn-clear").addEventListener("click", () => {
        groceriesList = []

        localStorage.setItem("groceries", JSON.stringify(groceriesList))
        populateItems(groceriesList)

        formInput.value = ""
        submitBtn.textContent = "Submit"

        formInput.focus()
    })
}
