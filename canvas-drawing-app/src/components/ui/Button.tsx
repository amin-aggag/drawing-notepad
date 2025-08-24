export default function Button({ handleOnClick, label, isDisabled}) {
  return (
    <button style={{fontSize: "50px", zIndex: "2", background: "aliceblue", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", padding: "5px", minWidth: "100px", height: "75px", marginRight: "15px", paddingTop: "0"}} onClick={handleOnClick} disabled={isDisabled}>{`${label}`}</button>
  )
}