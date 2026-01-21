---
title: Introduction to Terraform
order: 1
duration: 20 min
objectives:
  - Understand what Terraform does and how it works
  - Install Terraform on your machine
  - Write your first Terraform configuration
  - Run terraform init, plan, and apply
---

## How Terraform Works

Terraform follows a simple workflow:

1. **Write** - Define resources in `.tf` files
2. **Plan** - Preview what Terraform will do
3. **Apply** - Create, update, or delete resources
4. **Destroy** - Clean up when done

Under the hood, Terraform:

- Reads your configuration files
- Compares desired state to actual state
- Calculates the minimal set of changes needed
- Executes those changes via cloud provider APIs

<info>
Terraform is **declarative**. You describe what you want, not how to create it. Terraform figures out the "how" for you.
</info>

## Installing Terraform

### macOS (with Homebrew)

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### Linux

```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### Verify Installation

```bash
terraform version
```

You should see output like:

```
Terraform v1.6.0
on darwin_arm64
```

## Your First Configuration

Create a new directory and file:

```bash
mkdir terraform-intro && cd terraform-intro
```

Create `main.tf` with this content:

```hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

resource "local_file" "hello" {
  content  = "Hello, Terraform!"
  filename = "${path.module}/hello.txt"
}
```

This configuration uses the `local` provider to create a file. It's perfect for learning without needing cloud credentials.

## The Terraform Workflow

### Step 1: Initialize

```bash
terraform init
```

This downloads the required providers and sets up your working directory.

### Step 2: Plan

```bash
terraform plan
```

Terraform shows you what it will do:

```
Terraform will perform the following actions:

  # local_file.hello will be created
  + resource "local_file" "hello" {
      + content  = "Hello, Terraform!"
      + filename = "./hello.txt"
      + id       = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

<tip>
Always review the plan before applying! In production, this prevents accidental destruction of resources.
</tip>

### Step 3: Apply

```bash
terraform apply
```

Terraform asks for confirmation, then creates the resource:

```
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

local_file.hello: Creating...
local_file.hello: Creation complete after 0s [id=...]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Check your directory - `hello.txt` now exists!

```bash
cat hello.txt
```

### Step 4: Destroy (When Done)

```bash
terraform destroy
```

This removes all resources managed by this configuration.

<warning>
Be careful with `terraform destroy` in production! It will delete real infrastructure.
</warning>

## Understanding State

Terraform keeps track of what it manages in a **state file** (`terraform.tfstate`). This file maps your configuration to real resources.

```bash
cat terraform.tfstate
```

You'll see JSON describing the resources Terraform created.

<danger>
Never manually edit the state file! Use `terraform state` commands if you need to modify state.
</danger>

## Practice Exercise

1. Modify `main.tf` to change the file content
2. Run `terraform plan` - what does it show?
3. Run `terraform apply` to update the file
4. Clean up with `terraform destroy`

## Key Takeaways

- Terraform is declarative: describe what you want, not how to build it
- The workflow is: init → plan → apply → (eventually) destroy
- State tracks the mapping between config and real resources
- Always review plans before applying

Next, we'll learn about providers and resources in depth.
