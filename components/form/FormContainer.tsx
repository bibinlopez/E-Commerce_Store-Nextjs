'use client'

import { useActionState } from 'react'
import { useEffect } from 'react'
import toast, { useToaster } from 'react-hot-toast'
import { actionFunction } from '@/utils/types'

const initialState = {
  message: '',
}

function FormContainer({
  action,
  children,
}: {
  action: actionFunction
  children: React.ReactNode
}) {
  const [state, formAction] = useActionState(action, initialState)

  useEffect(() => {
    if (state.message) {
      toast(`${state.message}`)
    }
  }, [state])
  return <form action={formAction}>{children}</form>
}
export default FormContainer
