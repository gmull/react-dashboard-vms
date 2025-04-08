import json
from random import choice, randint

# Sample options for randomization
platforms = ["Windows", "Linux"]
statuses = ["normal", "offline", "warning"]
agent_versions = ["7.17.18604.0", "7.18.12000.0", "7.16.21004.0"]
account_ids = ["ff5c0aa5-a03e-47b5-9761-f4a44b0ed2df", "ff5c0aa5-a03e-47b5-9761-f4a44b0ed2de"]

# Generate 50 mock Azure devices
devices = [
    {
        "service_provider": "AZURE",
        "service_provider_account_id": choice(account_ids),  # <-- fixed here
        "hostname": f"GOLDSNITCH-VM{str(i+1).zfill(2)}",
        "platform_name": choice(platforms),
        "status": choice(statuses),
        "agent_version": choice(agent_versions)
    }
    for i in range(50)
]

# Save as JSON
output_path = "devices.json"
with open(output_path, "w") as f:
    json.dump(devices, f, indent=2)

print(f"Saved to {output_path}")
