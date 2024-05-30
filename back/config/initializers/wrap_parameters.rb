ActiveSupport.on_load(:action_controller) do
  # 以下を削除あるいはコメントアウト
  # wrap_parameters format: [:json] # これはデフォルトで書いてあった記述
  # 以下を追加
  wrap_parameters false 
end