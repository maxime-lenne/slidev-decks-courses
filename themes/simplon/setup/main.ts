import { defineAppSetup } from '@slidev/types'

// Import common components
import CodeBlock from '../../common/components/CodeBlock.vue'
import LearningObjective from '../../common/components/LearningObjective.vue'
import ExerciseCard from '../../common/components/ExerciseCard.vue'

export default defineAppSetup(({ app }) => {
  // Register common components globally
  app.component('CodeBlock', CodeBlock)
  app.component('LearningObjective', LearningObjective)
  app.component('ExerciseCard', ExerciseCard)
})
