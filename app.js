let groceriesList = []

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

document.querySelector(".form > .btn-submit").addEventListener("click", (e) => {
    e.preventDefault()

    const formInput = document.querySelector(".form > input")

    if (formInput.value == "") {
        emptyAlert()

        formInput.focus()
        return
    }

    if (formInput.value) {
        groceriesList.push(formInput.value)
        localStorage.setItem("groceries", JSON.stringify(groceriesList))
        populateItems(groceriesList)

        formInput.value = ""

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
            <div class="item">
                        <h3 class="item-name">${item}</h3>
                        <div class="btn-container">
                            <div class="btn btn-edit">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="btn btn-delete">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
            `
        })
        .join("")

    document.querySelector(".content").innerHTML = itemElements

    document.querySelectorAll(".btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("btn-delete")) {
                groceriesList = groceriesList.filter(
                    (item) =>
                        item !==
                        btn.parentElement.parentElement.children[0].textContent
                )

                localStorage.setItem("groceries", JSON.stringify(groceriesList))
                populateItems(groceriesList)
            }

            if (e.currentTarget.classList.contains("btn-edit")) {
                console.log("edit")
            }
        })
    )
}
