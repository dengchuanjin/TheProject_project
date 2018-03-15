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
import CurrentTeamProject from '@/components/CurrentTeamProject'
import SignIn from '@/components/SignIn'
import UpdateInformation from '@/components/UpdateInformation'
import ParentComponents from '@/components/ParentComponents'
import InspectProject from '@/components/InspectProject'

export default [
  {
    path: '/',
    component: Login,
    name: 'Login'
  },
  {
    path: '/signIn',
    component: SignIn,
    name: 'SignIn'
  },
  {
    path: '/parentComponents',
    component: ParentComponents,
    name: 'ParentComponents',
    children: [
      {
        path: 'projectSituation',
        components: {
          default: ParentComponents,
          User: ProjectSituation
        },
        name: 'ProjectSituation'
      },
      {
        path: 'inspectProject',
        components: {
          default: ParentComponents,
          User: InspectProject
        },
        name: 'InspectProject'
      },
      {
        path: 'projectSituationDetails',
        components: {
          default: ParentComponents,
          User: ProjectSituationDetails
        },
        name: 'ProjectSituationDetails'
      },
      {
        path: 'addProjectSituation',
        components: {
          default: ParentComponents,
          User: AddProjectSituation
        },
        name: 'AddProjectSituation'
      },
      {
        path: 'updateProjectDetils',
        components: {
          default: ParentComponents,
          User: UpdateProjectDetils
        },
        name: 'UpdateProjectDetils'
      },
      {
        path: 'addCheckRecord',
        components: {
          default: ParentComponents,
          User: AddCheckRecord
        },
        name: 'AddCheckRecord'
      },
      {
        path: 'checkRecordDetils',
        components: {
          default: ParentComponents,
          User: CheckRecordDetils
        },
        name: 'CheckRecordDetils'
      },
      {
        path: 'updateCheckRecord',
        components: {
          default: ParentComponents,
          User: UpdateCheckRecord
        },
        name: 'UpdateCheckRecord'
      },
      {
        path: 'currentTeamProject',
        components: {
          default: ParentComponents,
          User: CurrentTeamProject
        },
        name: 'CurrentTeamProject'
      },
      {
        path: 'updateInformation',
        components: {
          default: ParentComponents,
          User: UpdateInformation
        },
        name: 'UpdateInformation'
      },
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {name: 'ProjectSituation'}
  },
]



