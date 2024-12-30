/*
  # Create addresses table and setup security policies

  1. New Tables
    - `addresses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `street` (text)
      - `city` (text)
      - `state` (text)
      - `postal_code` (text)
      - `country` (text)
      - `latitude` (double precision)
      - `longitude` (double precision)
      - `is_default` (boolean)
      - `label` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `addresses` table
    - Add policies for authenticated users to:
      - Read their own addresses
      - Create new addresses
      - Update their own addresses
      - Delete their own addresses
*/

CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  is_default boolean DEFAULT false,
  label text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own addresses
CREATE POLICY "Users can read own addresses"
  ON addresses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to create addresses
CREATE POLICY "Users can create addresses"
  ON addresses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own addresses
CREATE POLICY "Users can update own addresses"
  ON addresses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own addresses
CREATE POLICY "Users can delete own addresses"
  ON addresses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX addresses_user_id_idx ON addresses(user_id);
CREATE INDEX addresses_is_default_idx ON addresses(is_default);