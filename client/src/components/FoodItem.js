
import { useState, useEffect } from "react"

function FoodItem({food, handleDeleteFood, handleChangeFood}) {
    const [changeForm, setChangeForm] = useState(false)
    const [foodState, setFoodState] = useState(food.name)

    function handleSubmit(event) {
        event.preventDefault()
        handleChangeFood(food.id, foodState)
        setChangeForm(false)
    }

    const addFoodForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" value={foodState ? foodState : ""} onChange={handleChange} />
                <button type="submit">Add Food</button>
            </form>
        )
    }

    const foodUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" value={foodState ? foodState : ""} onChange={handleChange} />
                <button type="submit">Update Food</button>
            </form>
        )
    }

    const changeFoodButton = () => {
        return <button onClick={() => setChangeForm(true)}>Change Food</button>
    }

    function handleChange(event) {
        setFoodState(event.target.value)
    }

    function changeFoodFunctions() {
        return (
            <>
                {changeForm ? foodUpdateForm() : changeFoodButton()}
                <button onClick={() => handleDeleteFood(food.id)}>Delete Food</button>
            </>
        )
    }
 
    return (
        <li key={food.id}>
            {food.family_member_name} will bring {food.name ? foodState : addFoodForm()}
            {food.name ? changeFoodFunctions() : null}

            {/* {changeForm ? foodUpdateForm() : changeFoodButton()}
            <button onClick={() => handleDeleteFood(food.id)}>Delete Food</button> */}
        
        </li>
    )
}

export default FoodItem

