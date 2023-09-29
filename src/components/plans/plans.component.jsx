import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { firestore } from "../../utils/firebase.utils";
import { selectUser } from "../../redux/user/userSlice";

import "./plans.styles.css";


const Plans = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        firestore.collection("customers").doc(user.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    })
                })
            })
    }, [user.uid])

    useEffect(() => {
        firestore.collection('products').where("active", "==", true)
            .get()
            .then(querySnapshot => {
                const products = {};
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
            })
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await firestore.collection("customers").doc(user.uid)
            .collection("checkout_session")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
                const stripe = await loadStripe('');
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    return (
        <div className="plans">
            <br />
            {
                subscription &&
                <p>
                    Renewal Data:{new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
                </p>
            }
            {
                Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.tolowerCase()
                        .includes(subscription?.role)
                    return (
                        <div key={productId}
                            className={`${isCurrentPackage && "plans_plan--disabled"} plans_plan`}>
                            <div className="plans_info">
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>
                            <button onClick={() =>
                                !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                            >
                                {isCurrentPackage ? "Current Package" : "Subscribe"}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )

}


export default Plans;