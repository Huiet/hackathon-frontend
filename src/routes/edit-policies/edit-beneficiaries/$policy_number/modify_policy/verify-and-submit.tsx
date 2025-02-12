import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/edit-policies/edit-beneficiaries/$policy_number/modify_policy/verify-and-submit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/edit-policies/edit-beneficiaries/$policy_number/modify_policy/verify-and-submit"!
    </div>
  )
}
