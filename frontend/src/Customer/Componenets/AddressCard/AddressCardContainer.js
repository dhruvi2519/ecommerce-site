// AddressContainer.js
import { connect } from "react-redux";
import AddressCard from "./AddressCard";
import { fetchAddresses } from "../../../State/Cart/Action";

const mapStateToProps = (state) => ({
  addresses: state.cart.addresses,
  loading: state.cart.loadingAddresses,
  error: state.cart.errorAddresses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddresses: () => dispatch(fetchAddresses()),
});

const AddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressCard);

export default AddressContainer;
