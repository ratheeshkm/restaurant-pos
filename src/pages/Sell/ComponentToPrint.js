import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

export class ComponentToPrint extends React.Component {
  render() {
    return (
			<Fragment>
				<table style={{width: "250px"}}  className="text-center">
				<tbody>
					<tr>
							<td colSpan="2" className="text-center"><h5>#1</h5></td>
						</tr>
						<tr>
							<th>Item</th>
							<th>Qty</th>
						</tr>
					
						{
								this.props.items.map((item, index) => {
									return <tr key={`item-${uuidv4()}`}>
										<td>{item.name}</td>
										<td>1</td>
									</tr> 
								})
							}
						
					</tbody>
      	</table>
			</Fragment>
      
    );
  }
}