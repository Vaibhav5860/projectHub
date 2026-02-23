import React from 'react'

const integrations = [
  {
    name: 'GitHub',
    description: 'Connect your repositories for seamless code integration',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    connected: true,
    account: 'johndoe',
    color: 'from-slate-700 to-slate-900',
  },
  {
    name: 'Slack',
    description: 'Get notifications and updates directly in Slack',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
    connected: false,
    account: null,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Google Drive',
    description: 'Sync documents and files with Google Drive',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.71 3.5L1.15 15l4.58 7.5h13.54l4.58-7.5L17.29 3.5H7.71zM14 14.5H7l-2.5 4.5h12l2.5-4.5H14z" />
      </svg>
    ),
    connected: true,
    account: 'john@gmail.com',
    color: 'from-yellow-400 to-green-500',
  },
  {
    name: 'Figma',
    description: 'Import designs and link Figma files to projects',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.588 4.539zm-.001-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.665 0 3.118-1.395 3.118-3.068v-2.97H8.147zM8.148 8.981c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981H8.148zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zM15.852 24c-2.476 0-4.49-2.014-4.49-4.49v-4.49h4.49c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-3.019-7.509v3.019c0 1.665 1.354 3.019 3.019 3.019s3.019-1.354 3.019-3.019-1.354-3.019-3.019-3.019h-3.019zM15.852 16.471c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.354-3.019-3.019-3.019z" />
      </svg>
    ),
    connected: false,
    account: null,
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Jira',
    description: 'Sync tasks and issues with Jira projects',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.758a1.001 1.001 0 00-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024.013 12.5V1.005A1.005 1.005 0 0023.013 0z" />
      </svg>
    ),
    connected: false,
    account: null,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Notion',
    description: 'Connect Notion pages and databases',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.1 2.16c-.42-.326-.98-.7-2.055-.607L3.01 2.86c-.466.046-.56.28-.374.466l1.823 1.338v-.456zm.793 3.358v13.905c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.633c0-.606-.233-.933-.746-.886l-15.177.887c-.56.046-.747.326-.747.932zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.933-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.455-.234 4.763 7.28V9.527l-1.215-.14c-.093-.514.28-.886.747-.933l3.224-.186z" />
      </svg>
    ),
    connected: true,
    account: 'John\'s Workspace',
    color: 'from-slate-800 to-slate-950',
  },
]

const IntegrationSettings = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Integrations</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Connect third-party services to enhance your workflow</p>
      </div>
      <div className="p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div key={item.name} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/30">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</h3>
                  {item.connected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{item.description}</p>
                {item.connected ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.account}</span>
                    <button className="text-xs font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer">Disconnect</button>
                  </div>
                ) : (
                  <button className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg transition cursor-pointer">
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntegrationSettings
