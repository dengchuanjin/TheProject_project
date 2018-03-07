/*
* Created by dcj on 18/3/5
* */

import Login from '@/components/Login.vue'
import ProjectSituation from '@/components/ProjectSituation'
import ProjectSituationDetails from '@/components/ProjectSituationDetails'
import AddProjectSituation from '@/components/AddProjectSituation'
import UpdateProjectDetils from '@/components/UpdateProjectDetils'
import AddCheckRecord from '@/components/AddCheckRecord'
import CheckRecordDetils from '@/components/CheckRecordDetils'
import UpdateCheckRecord from '@/components/UpdateCheckRecord'

export default [
  {
    path: '/',
    component: Login,
    name: 'Login'
  },
  {
    path: '/projectSituation',
    component: ProjectSituation,
    name: 'ProjectSituation'
  },
  {
    path: '/projectSituationDetails',
    component: ProjectSituationDetails,
    name: 'ProjectSituationDetails'
  },
  {
    path:'/addProjectSituation',
    component: AddProjectSituation,
    name: 'AddProjectSituation'
  },
  {
    path:'/updateProjectDetils',
    component: UpdateProjectDetils,
    name: 'UpdateProjectDetils'
  },
  {
    path:'/addCheckRecord',
    component: AddCheckRecord,
    name: 'AddCheckRecord'
  },
  {
    path:'/checkRecordDetils',
    component: CheckRecordDetils,
    name: 'CheckRecordDetils'
  },
  {
    path:'/updateCheckRecord',
    component: UpdateCheckRecord,
    name: 'UpdateCheckRecord'
  }

]



