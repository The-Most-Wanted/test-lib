/*
  # Fix books table RLS policy for anonymous access

  1. Security Changes
    - Add policy to allow anonymous users to view active books
    - This enables the featured books section to work for non-authenticated users
    - Maintains security by only allowing read access to active books

  The current policy only works for authenticated users. We need to add
  a separate policy for anonymous users to view active books.
*/

-- Add policy for anonymous users to view active books
CREATE POLICY "Anonymous users can view active books"
  ON books
  FOR SELECT
  TO anon
  USING (active = true);