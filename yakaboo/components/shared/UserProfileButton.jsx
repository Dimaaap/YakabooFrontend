import React from 'react'
import { CookiesWorker } from '../../services'

export const UserProfileButton = () => {

    const getUserFirstLetters = () => {
        const firstName = CookiesWorker.get("first_name")
        const lastName = CookiesWorker.get("last_name")

        let firstLetters = "";

        if(firstName && lastName){
            firstLetters = firstName[0] + lastName[0]
        } else {
            firstLetters = "";
        }

        return firstLetters;
    }

  return (
    <div className="profile-btn">
        <span className="profile-btn__user">
            { getUserFirstLetters().toUpperCase() }
        </span>
    </div>
  )
}
