re 'mina/bundler'
require 'mina/rails'
require 'mina/git'
 
# Basic settings:
# domain     - The hostname to SSH to
# deploy_to  - Path to deploy into
# repository - Git repo to clone from (needed by mina/git)
# user       - Username in the  server to SSH to (optional)
 
set :domain, 'statetable_com'
set :deploy_to, '/var/www/statetable_com'
set :repository, 'git@ross.no-ip.org:statetable_com'
set :user, 'deploy'
# set :port, '30000'
 
desc "Deploys the current version to the server."
 task :deploy do
   deploy do
     invoke :'git:clone'
     to :launch do
       queue 'service statetable_com restart'
     end
 
  end
end
 
task :start do
 queue %[cd #{deploy_to}/current && service statetable_com start]
end
 
task :restart do
 queue %[cd #{deploy_to}/current && service statetable_com restart]
end
 
task :stop do
  queue %[cd #{deploy_to}/current && service statetable_com stop]
end
