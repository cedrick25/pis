-- =============================================================================
-- Local development: grant ALL permissions to an account (and its role)
-- Database: pis
--
-- Default target: local `admin` user
--   uuid: b6a09e77-ee36-4aac-98cb-3572042c927d
-- Role:  SYSTEM ADMINISTRATOR (id = 1)
-- Field office: Central Office HQ (department id = 206)
--
-- To grant for a different account, change @target_user_uuid / @target_role_id /
-- @target_department_id below, then re-run.
-- =============================================================================

START TRANSACTION;

SET @target_user_uuid     = 'b6a09e77-ee36-4aac-98cb-3572042c927d';
SET @target_role_id       = 1;     -- SYSTEM ADMINISTRATOR
SET @target_department_id = 206;   -- Central Office HQ
SET @actor                = 'LOCAL_DEV';

-- ---------------------------------------------------------------------------
-- 1) Ensure the user has an active user_role row pointing at the admin role
-- ---------------------------------------------------------------------------
UPDATE `user_role`
SET
  `role_id`      = @target_role_id,
  `updated_by`   = @actor,
  `updated_date` = NOW(),
  `status`       = 1
WHERE `user_id` = @target_user_uuid
  AND `status` = 1;

INSERT INTO `user_role` (
  `created_by`, `created_date`, `status`, `role_id`, `user_id`
)
SELECT @actor, NOW(), 1, @target_role_id, @target_user_uuid
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1
  FROM `user_role`
  WHERE `user_id` = @target_user_uuid
    AND `status` = 1
    AND `role_id` = @target_role_id
);

-- ---------------------------------------------------------------------------
-- 2) Ensure the user profile has a field office (department)
-- ---------------------------------------------------------------------------
UPDATE `user_profile`
SET
  `department_id` = @target_department_id,
  `updated_by`    = @actor,
  `updated_date`  = NOW()
WHERE `uuid` = @target_user_uuid;

-- ---------------------------------------------------------------------------
-- 3) Soft-remove existing role_permission rows for the target role
--    (mirrors RolePermissionServiceImpl upsert behavior)
-- ---------------------------------------------------------------------------
UPDATE `role_permission`
SET
  `status`       = 0,
  `updated_by`   = @actor,
  `updated_date` = NOW()
WHERE `role_id` = @target_role_id
  AND `status` = 1;

-- ---------------------------------------------------------------------------
-- 4) Insert ALL active permissions for the target role with value = granted
-- ---------------------------------------------------------------------------
INSERT INTO `role_permission` (
  `created_by`,
  `created_date`,
  `status`,
  `permission_id`,
  `role_id`,
  `value`
)
SELECT
  @actor,
  NOW(),
  1,
  p.`id`,
  @target_role_id,
  1
FROM `permission` p
WHERE p.`status` = 1;

-- ---------------------------------------------------------------------------
-- 5) (Optional) Also fully grant role id 8 "Administrator" for local use
-- ---------------------------------------------------------------------------
UPDATE `role_permission`
SET
  `status`       = 0,
  `updated_by`   = @actor,
  `updated_date` = NOW()
WHERE `role_id` = 8
  AND `status` = 1;

INSERT INTO `role_permission` (
  `created_by`,
  `created_date`,
  `status`,
  `permission_id`,
  `role_id`,
  `value`
)
SELECT
  @actor,
  NOW(),
  1,
  p.`id`,
  8,
  1
FROM `permission` p
WHERE p.`status` = 1;

COMMIT;

-- ---------------------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------------------
SELECT u.`id`, u.`name`, u.`uuid`, ur.`role_id`, r.`name` AS role_name, up.`department_id`
FROM `user` u
LEFT JOIN `user_role` ur
  ON ur.`user_id` = u.`uuid` AND ur.`status` = 1
LEFT JOIN `role` r
  ON r.`id` = ur.`role_id`
LEFT JOIN `user_profile` up
  ON up.`uuid` = u.`uuid`
WHERE u.`uuid` = @target_user_uuid;

SELECT
  rp.`role_id`,
  r.`name` AS role_name,
  COUNT(*) AS permission_rows,
  SUM(CASE WHEN rp.`value` = 1 THEN 1 ELSE 0 END) AS granted
FROM `role_permission` rp
JOIN `role` r ON r.`id` = rp.`role_id`
WHERE rp.`status` = 1
  AND rp.`role_id` IN (@target_role_id, 8)
GROUP BY rp.`role_id`, r.`name`;
