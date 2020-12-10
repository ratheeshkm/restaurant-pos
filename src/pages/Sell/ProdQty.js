import React, { useEffect, useState} from 'react';

const ProdQty = (props) => {
	const { itemQty, item, updateItemQty, itemId } = props;
	const [ qty, setQty ] = useState("");

	useEffect(() => {
		itemQty && setQty(parseInt(itemQty, 10))
	}, [itemQty]);

	useEffect(() => {
		qty && setQty(parseInt(qty, 10));
		qty && updateItemQty(qty, item, itemId);
	}, [qty, updateItemQty, item, itemId]);

  const handleChange = (event) => {
		if(qty < 1) return;
		if(event.target.value === '+') {
			setQty(qty + 1)
		}
		if(event.target.value === '-') {
			qty > 1 && setQty(qty - 1)
		}
	};
	console.log("qty-->", qty)
  return (
    <div className="input-group">
      <input
        type="button"
        value="-"
        className="button-minus"
        data-field="quantity"
        onClick={handleChange}
      />
      <input
        type="number"
        step="1"
        value={qty}
        name="quantity"
        className="quantity-field"
        onChange={handleChange}
      />
      <input
        type="button"
        value="+"
        className="button-plus"
        data-field="quantity"
        onClick={handleChange}
      />
    </div>
  );
};

export default ProdQty;
