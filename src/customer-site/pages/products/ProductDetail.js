import { Button, Card, Form, Badge, Stack } from "react-bootstrap";
import { getStaticResourceUrl } from "../../utilities/getStaticResource";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/customerCartAction";
import { useNavigate } from "react-router-dom";

function ProductDetail({ product }) {
  const [quantity, setQantity] = useState(1);
  const dispatch = useDispatch();
  let customerLogin = useSelector(
    (state) => state.customerAuthReducer.customerLogin
  );
  const navigate = useNavigate();

  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQantity(value);
    }
  };

  const handleAdd = () => {
    if (customerLogin == null) {
      navigate("/login");
    } else {
      dispatch(
        addToCart({
          ...product,
          quantity: quantity,
        })
      );
    }
  };

  return (
    <div>
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Badge bg="secondary">{product.unit_price.toLocaleString()} đ</Badge>
          <Card.Text>{product.description}</Card.Text>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
              min={1}
            />
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductDetail;
