import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';

function ListPlan(props) {

  const moveFocus = (index, step) => {
    const sortedIndices = [...props.inputElem.current.keys()].sort();
    const nextIndex = sortedIndices[sortedIndices.indexOf(index) + step];
    props.inputElem.current.get(nextIndex)?.focus()
  }

  return (
    <div
      key={props.idx}
    >
      <Checkbox
        checked={props.done}
        onChange={ (e) => {
          props.saveDone(props.plankey, e.target.checked)
        }}
      />
      <Input
        plankey={props.plankey}
        onChange={(e) => {
          props.saveDescription(props.plankey, e.target.value)
        }}
        value={props.description}
        onKeyPress={(e) => {
          if(e.which === 13){
            // Enterが押された場合
            props.createPlan('10', '11')
            moveFocus(props.plankey, 1)
          }
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 8 && e.target.value.length === 0) {
            // Delete押下時かつ文字が入力されていない場合
            props.deletePlan(props.plankey)
            moveFocus(props.plankey, -1)
          }
        }}
        ref={(element) => {
          const inputElm = element?.children[0]
          if (inputElm) props.inputElem.current.set(props.plankey, inputElm);
          else props.inputElem.current.delete(props.plankey);
        }}
      />
    </div>
  )
}

export default ListPlan;