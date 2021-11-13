import { useState } from "react";

const SQUARE_HEIGHT = 80
const UNIT_NUM_IN_SQUARE = 4
const UNIT_HEIGHT = SQUARE_HEIGHT / UNIT_NUM_IN_SQUARE
const UNIT_MINUTES = 60 / UNIT_NUM_IN_SQUARE

export const usePlan = (text, setText, planKey, setPlanKey, formatText, updateLocalStorage) => {
  const [plan, setPlan] = useState(JSON.parse(localStorage.getItem("plan")) ?? [])

  const createPlan = (startHour, endHour) => {
    const updatedPlan = plan.slice(0)
    updatedPlan.push(
      {
        key: planKey.toString(),
        description: '',
        startHour:  startHour,
        endHour:  endHour,
        startMinute:  0,
        endMinute:  0,
        minutes: 60,
        hours: 1,
      }
    )
    setPlan(updatedPlan)
    setPlanKey(Number(planKey) + 1)
    const text = formatText(updatedPlan)
    updateLocalStorage(text, updatedPlan, Number(planKey) + 1);
  }

  const updatePlan =
    (planKey, startHour, endHour, startMinute, endMinute, minutes, hours, description) => {
      const updatedPlan = plan.slice(0).map(p => {
        if(p.key === planKey){
          p.startHour = startHour
          p.endHour = endHour
          p.startMinute = startMinute
          p.endMinute = endMinute
          p.minutes = minutes
          p.hours = hours
          if(description !== ''){
            plan.description = description
          }
        }
        return p
      })
      setPlan(updatedPlan)
      const text = formatText(plan)
      updateLocalStorage(text, plan, planKey);
    }

  const deletePlan = (e) => {
    let planKey = e.target.getAttribute('plankey')
    const updatedPlan = plan.slice(0).filter((p) => {
      return Number(p.key) !== Number(planKey)
    })
    setPlan(updatedPlan)
    const text = formatText(updatedPlan)
    updateLocalStorage(text, updatedPlan, planKey);
  }


  const calculatePlanTime = (height, postition) => {
    const unit = height / UNIT_HEIGHT
    // const step = unit % UNIT_NUM_IN_SQUARE
    const minutes = (unit * UNIT_HEIGHT) / SQUARE_HEIGHT * 60
    const startHour = Math.floor(Math.round((postition / SQUARE_HEIGHT)* 10) / 10)
    let startMinute = (Math.round((postition % SQUARE_HEIGHT) / UNIT_HEIGHT ) * UNIT_MINUTES) % 60
    const endHour = startHour + Math.floor((startMinute + minutes) / 60)
    let endMinute = (startMinute + minutes) % 60

    return {
      startHour: startHour,
      endHour: endHour,
      startMinute: startMinute,
      endMinute: endMinute,
      minutes: minutes,
      hours: minutes / 60,
    }
  }

  return {
    plan,
    setPlan,
    createPlan,
    updatePlan,
    deletePlan,
    calculatePlanTime
  }
}