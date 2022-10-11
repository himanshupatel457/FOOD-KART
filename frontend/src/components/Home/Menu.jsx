import React from 'react'
import MenuCard from './MenuCard'
import sandwich from '../../assets/sandwich.jpg'
import ff from '../../assets/ff.jpg'
import pizza from '../../assets/pizza.jpg'
import toast from "react-hot-toast"

import { useDispatch } from "react-redux"
const Menu = () => {
    const dispatch = useDispatch();

    const addToCartHandler = (itemNum) => {
        switch (itemNum) {
            case 1:
                dispatch({ type: "sandwichIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to CART");
                break;
            case 2:
                dispatch({ type: "pizzaIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to CART");
                break;
            case 3:
                dispatch({ type: "french_friesIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to CART");
                break;
            default:
                dispatch({ type: "sandwichIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to CART");
                break;
        }
    }




    return (
        <section id='menu'>

            <h1> feeling hungery !</h1>
            <div>
                <MenuCard
                    itemNum={1}
                    foodSrc={sandwich}
                    price={200}
                    title={"sandwich"}
                    delay={0.3}
                    handler={addToCartHandler}
                />
                <MenuCard
                    itemNum={2}
                    delay={0.6}
                    foodSrc={pizza}
                    price={200}
                    title={"pizza"}
                    handler={addToCartHandler}
                />
                <MenuCard
                    itemNum={3}
                    delay={0.8}
                    foodSrc={ff}
                    price={200}
                    title={"french_fries"}
                    handler={addToCartHandler}
                />
            </div>
        </section>
    )
}

export default Menu