import { defaultConfig } from '@formkit/vue'

export default defaultConfig({
  config: {
    classes: {
      outer: 'mb-4',
      label: 'block text-sm font-medium text-gray-700',
      inner: 'mt-1 relative',
      input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
      help: 'text-xs text-gray-500 mt-1',
      message: 'text-red-500 mb-1 text-xs'
    }
  }
})