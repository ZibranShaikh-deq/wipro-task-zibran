import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form } from 'react-bootstrap'

import Texts from 'constants/staticText'
import { getSuggestions } from "service/api"
import { debounce } from "lodash";

import './index.css'

// Component For Resuable Search Box
const SearchBox = () => {
  const [ suggestions, setSuggestions ] = useState([])
  const [ value, setValue ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
  const [ activeOptionIndex, setActiveOptionIndex ] = useState(0)
  
  const inputRef = useRef()
  const node = useRef();

  // Function For Handle Click Out of Div Event
  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setShowOptions(false)
    }
  };

  // Hooks For adding Mouse Event
  useEffect(() => {
    // Not manipulating the DOM, Listening to events.
      document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Variables for value which is used in component. 
  const searchValueArray = value.split(" ")
  const lastWord = searchValueArray[searchValueArray.length - 1]
  
  // Function for handle the focus event for input box.
  const handleOnFocus = async (searchedValue) => {
    const searchValueArray = searchedValue.split(" ")
    const searchedText = searchValueArray[searchValueArray.length - 1]
    if(searchedText){
      try {
        const options = await getSuggestions(searchedText)
        setSuggestions(options)
        setShowOptions(true)
        setActiveOptionIndex(0)
      } catch (error) {
        console.error('Got error in receiving data:  ', error)
      }
    }
  }
  
  // Debounce On change handler  
  const debouncedInputChange = useCallback(debounce(handleOnFocus, 500), [])

  // Function for hanlding change in the state.
  const handleInputChange = (event) => {
    event.preventDefault()
    const searchedValue = event.target.value
    setValue(searchedValue)
    let latestSearchValueArray = searchedValue.split(" ")
    if(lastWord !== latestSearchValueArray[latestSearchValueArray.length - 1]){
      debouncedInputChange(searchedValue)
    }else{
      setShowOptions(false)
    }
  }
  
  // Function for handling the onclick event of the options.
  const handleOnClick = (item) => {
    let searchValueArray = value.split(" ")
    if(searchValueArray || item){
      searchValueArray[searchValueArray.length - 1] = item
      let finalValue = searchValueArray.toString().replace(/,/g, " ")
      setShowOptions(false)
      setValue(finalValue+" ")
      setActiveOptionIndex(null)
      inputRef.current.focus()
    }
  }

  // Function for handle Key press
  const handleKeyPress = (event) => {
    switch(event.keyCode){
      case 38:
        event.preventDefault()
        if(activeOptionIndex > 0){
          setActiveOptionIndex(activeOptionIndex - 1)
        }
        return;
      case 40:
        event.preventDefault()
        if(activeOptionIndex < suggestions.length - 1){
          setActiveOptionIndex(activeOptionIndex + 1)
        }
        return;
      case 13:
        event.preventDefault()
        handleOnClick(suggestions[activeOptionIndex])
        return;
      default:
        return;
    }
  }

  //Return the JSX of SerchBox.
  return (
    <div className="parent-container">
			<Form >
        <Form.Group>
          <Form.Label>{Texts.SEARCH}</Form.Label>
          <div ref={node}>
            <Form.Control 
              ref={inputRef}
              type="text" 
              autoComplete="off"
              placeholder={Texts.PLACEHOLDER}
              onChange={handleInputChange}
              value={value}
              onKeyDown={handleKeyPress}
            >
            </Form.Control>
            {showOptions && suggestions && suggestions.length > 0 && (
              <div className="option-div">
                {suggestions.map((item, index) => (
                  <option 
                    key={item}
                    className={`option ${item === lastWord ? "highlight-color" : ""} 
                    ${activeOptionIndex === index ? "active-option" : ""}`} 
                    onClick={() => handleOnClick(item)}
                  >
                    {item}
                  </option>
                ))}
              </div>
            )}
          </div>
        </Form.Group>
			</Form>
    </div>
  )
}

SearchBox.propTypes = {}

export default SearchBox
