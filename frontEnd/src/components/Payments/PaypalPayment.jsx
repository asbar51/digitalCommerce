import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetOrdersQuery, useOrderMutation } from "../../services/postApi";
import { useGetProfileQuery } from "../../services/profileApi";
import { useNavigate } from "react-router-dom";

const PaypalPayment = ({id,quantity,price,firstName,lastName,phoneNumber,email}) => {
    const [order,{data:theOrdes}] = useOrderMutation()
    const navigate = useNavigate()
    let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
    let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()

    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("https://digitalcommerce-backend.onrender.com/posts/api/orders", {
          method: "POST",
          credentials: "include",
           headers: {
            "Content-Type": "application/json",
            "credentials": "include",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            cart: [
              {
                quantity,
                price
              },
            ],
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      const onApprove = (data) => {
         // Order is captured on the server and the response is returned to the browser
         return fetch(`https://digitalcommerce-backend.onrender.com/posts/api/orders/${data.orderID}/capture`, {
          method: "POST",
          credentials: "include",
           headers: {
            "Content-Type": "application/json",
            "credentials": "include",
          },
          body: JSON.stringify({
            orderID: data.orderID,
            productId: id,
            firstName,
            lastName,
            phoneNumber,
            email
          })
        })
        .then( (response) => response.json())
        .then(async (order) => {
          await refetchOrders()
          await refetchProfile()
          console.log("Payment successful");
          console.log("order: ",order)
          
        })
      };
      
    return ( 
        <PayPalButtons
            createOrder={(data,actions) => createOrder(data, actions)}
            onApprove={(data,actions) => onApprove(data, actions)}
        />
     );
}
 
export default PaypalPayment;